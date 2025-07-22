import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}
  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.save(createNoteDto);
  }

  findAll() {
    return    this.notesRepository.find();
  }

  findOne(id: number) {
    return this.notesRepository.findOne({
      where: { id },
  })
}

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto)
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
  findByUser(userId: number) {
    return this.notesRepository.find({
      where: { createdBy:{id:userId}  },
      relations: ['createdBy'],
      select: { id: true, title: true, content: true, createdAt: true, updatedAt: true, createdBy: { id: true, name: true } },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
