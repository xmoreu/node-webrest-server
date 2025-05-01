import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: null },

    { id: 3, text: 'Buy butter', createdAt: new Date() },

]
export class TodosController {
    // Dependency injeccion

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
        return
    }
    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) {
            res.status(400).json({ error: 'Id argument is not a number' })  //400 Bad request
            return
        }
        const todo = todos.find(todo => todo.id === id)
        todo ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` })  //404 Not found

        return
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) {
            res.status(400).json({ error: 'Text property is required' })
            return
        }
        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: null
        }
        todos.push(newTodo)
        res.json(newTodo)
    }

    public updateTodo= (req: Request, res: Response) => {
        const id=+req.params.id
        if (isNaN(id)) {
            res.status(400).json({ error: 'Id argument is not a number' })  //400 Bad request
            return
        }
        const todo = todos.find(todo => todo.id === id)
        if(!todo){
            res.status(404).json({error:`Todo with id ${id} not found`})
            return
        }
        const {text,createdAt}=req.body
        if (!text) {
           // res.status(400).json({ error: 'Text property is required' })
         //   return
        }
        todo.text=text || todo.text; // Si llega el valor text lo usa y si no no
        (createdAt ==='null') ? todo.createdAt=null : todo.createdAt=new Date(createdAt || todo.createdAt)
        // OJO referencia

        res.json(todo)
    }

    public deleteTodo= (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) {
            res.status(400).json({ error: 'Id argument is not a number' })  //400 Bad request
            return
        }
        const todo = todos.find(todo => todo.id === id)
       if(!todo){
        res.status(404).json({ error: `Todo with id ${id} not found` })  //404 Not found
        return
       } 
        //todos=todos.filter(todo=>todo.id!=id)
        const index=todos.indexOf(todo)
        todos.splice(index,1)
        res.json(todo)
    }

}