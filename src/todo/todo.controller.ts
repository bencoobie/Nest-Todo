import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Res() res, @Body() createTodoDto: CreateTodoDto) {
    try {
      const todo = await this.todoService.create(createTodoDto);
      return res.status(200).json({
        data: todo,
        statusCode: 200,
      });
    } catch (err) {
      return res.status(504).json({
        message: 'Todo oluşturulurken hata meydana geldi',
        statusCode: 504,
      });
    }
  }

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const todo = await this.todoService.findOne(id);
      if (!todo)
        return res
          .status(404)
          .json({ message: 'Todo not exist.', statusCode: 404 });
      return res.status(200).json({
        data: todo,
        statusCode: 200,
      });
    } catch (err) {
      return res.status(504).json({
        message: 'Todo aranırken hata meydana geldi.',
        statusCode: 504,
      });
    }
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    try {
      const updatedTodo = await this.todoService.update(id, updateTodoDto);
      return res.status(200).json({
        message: 'Todo başarıyla güncellendi.',
        data: updatedTodo,
        statusCode: 200,
      });
    } catch (err) {
      return res.status(504).json({
        message: 'Todo güncellenirken hata meydana geldi.',
        statusCode: 504,
      });
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const todo = await this.todoService.deleteOne(id);
      if (!todo)
        return res
          .status(404)
          .json({ message: 'Todo does not exist.', statusCode: 404 });
      return res
        .status(200)
        .json({ message: 'Todo başarıyla silindi.', statusCode: 200 });
    } catch (err) {
      return res.status(504).json({
        message: 'Todo silinirken hata meydana geldi.',
        statusCode: 504,
      });
    }
  }
}
