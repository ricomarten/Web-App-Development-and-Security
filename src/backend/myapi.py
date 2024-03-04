from typing import List
from fastapi import FastAPI, HTTPException, Path, Query
from pydantic import BaseModel

app = FastAPI()

class ToDoItem(BaseModel):
    text: str
    isCompleted: bool

class ToDoItemWithID(ToDoItem):
    id: int

# In-memory "database" for the purpose of this example
todo_db: List[ToDoItemWithID] = []

@app.get("/todos", response_model=List[ToDoItemWithID])
def get_todos():
    return todo_db

@app.post("/todos", response_model=ToDoItemWithID)
def create_todo(todo_item: ToDoItem):
    new_id = max([todo.id for todo in todo_db], default=0) + 1
    todo_db.append(ToDoItemWithID(**todo_item.dict(), id=new_id))
    return todo_db[-1]

@app.get("/todos/{todo_id}", response_model=ToDoItemWithID)
def get_todo(todo_id: int = Path(..., description="The ID of the ToDo item you want to retrieve")):
    for todo in todo_db:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="ToDo not found")

@app.put("/todos/{todo_id}", response_model=ToDoItemWithID)
def update_todo(todo_id: int, todo_item: ToDoItem):
    for index, current_todo in enumerate(todo_db):
        if current_todo.id == todo_id:
            todo_db[index] = ToDoItemWithID(**todo_item.dict(), id=todo_id)
            return todo_db[index]
    raise HTTPException(status_code=404, detail="ToDo not found")

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for index, todo in enumerate(todo_db):
        if todo.id == todo_id:
            del todo_db[index]
            return {"message": "ToDo deleted successfully"}
    raise HTTPException(status_code=404, detail="ToDo not found")

@app.get("/todos/filter", response_model=List[ToDoItemWithID])
def get_filtered_todos(isCompleted: bool = Query(None, description="Filter the todos by completion status")):
    if isCompleted is None:
        return todo_db
    return [todo for todo in todo_db if todo.isCompleted == isCompleted]
