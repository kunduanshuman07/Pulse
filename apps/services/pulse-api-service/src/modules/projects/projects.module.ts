import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';

import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
  ],

  controllers: [ProjectsController],

  providers: [ProjectsService],
})
export class ProjectsModule {}