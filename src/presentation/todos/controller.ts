import { Request, Response } from "express"
import { prisma } from "../../data/postgre"
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos"


export class TodosController {
    // Dependency injeccion

    constructor() { }

    public getTodos = async(req: Request, res: Response) => {
        const todos=await prisma.todo.findMany()
        res.json(todos)
        return
    }
    public getTodoById = async(req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) {
            res.status(400).json({ error: 'Id argument is not a number' })  //400 Bad request
            return
            
        }
        //const todo = todos.find(todo => todo.id === id)
        const todo=await prisma.todo.findFirst({
            where:{
                id:id
            }
        })
        todo ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` })  //404 Not found

        return
    }

    public createTodo = async(req: Request, res: Response) => {
        
        const [error,createTodoDTO]=CreateTodoDTO.create(req.body)
        if(error){
            res.status(400).json({error})
            return
        }
        
       const newTodo=await  prisma.todo.create({
            data:createTodoDTO!
        })
       
        res.json(newTodo)
    }

    public updateTodo=async (req: Request, res: Response) => {
        const id=+req.params.id
        const [error,updateTodoDTO]=UpdateTodoDTO.create({
            ...req.body,
            id
        })
        if(error) {
            res.status(400).json(error)
            return
        }
       
        const todo=await prisma.todo.findFirst({
            where:{
                id
            }
        })
        if(!todo){
            res.status(404).json({error:`Todo with id ${id} not found`})
            return
        }

        
       const updatedTodo=await prisma.todo.update({
            data:updateTodoDTO!.values,
            where:{
                id
            }
        })

        res.json(updatedTodo)
    }

    public deleteTodo= async(req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) {
            res.status(400).json({ error: 'Id argument is not a number' })  //400 Bad request
            return
        }
       // const todo = todos.find(todo => todo.id === id)

         const todo=await prisma.todo.findFirst({
            where:{
                id:id
            }
        })
        if(!todo) {
              res.status(404).json({ error: `Todo with id ${id} not found` }) 
              return
        }
          
        const todoDeleted=await prisma.todo.delete({
            where:{id}
        })

       
        res.json(todoDeleted)
    }

}