import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodo: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.create(createTodo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {
      new: true,
    });
  }

  async deleteOne(id: string) {
    return await this.todoModel.findByIdAndDelete(id);
  }
}
