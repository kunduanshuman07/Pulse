import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateProjectDto } from './dtos/create-project.dto';
import type { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Controller({
    path: 'projects',
    version: '1',
})
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
    ) { }

    @Post('create')
    createProject(
        @Body()
        createProjectDto: CreateProjectDto,

        @CurrentUser()
        user: JwtPayload,
    ) {
        return this.projectsService.createProject(
            createProjectDto,
            user,
        );
    }

    @Get()
    getProjects(
        @CurrentUser()
        user: JwtPayload,
    ) {
        return this.projectsService.getProjects(
            user,
        );
    }

    @Get(':id')
    getProjectById(
        @Param('id')
        projectId: string,

        @CurrentUser()
        user: JwtPayload,
    ) {
        return this.projectsService.getProjectById(
            projectId,
            user,
        );
    }

    @Delete(':id')
    deleteProject(
        @Param('id')
        projectId: string,

        @CurrentUser()
        user: JwtPayload,
    ) {
        return this.projectsService.deleteProject(
            projectId,
            user,
        );
    }
}