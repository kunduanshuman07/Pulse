import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { winstonLogger } from '../../common/logger/winston.logger';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ContentLanguage } from './enums/content-language.enum';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async createProject(
        createProjectDto: CreateProjectDto,
        user: JwtPayload,
    ) {
        winstonLogger.info(`Creating project for user: ${user.email}`);

        const project = this.projectRepository.create({
            ...createProjectDto,
            contentLanguage:
                createProjectDto.contentLanguage ??
                ContentLanguage.EN,
            user_id: user.sub,
        });

        await this.projectRepository.save(project);

        winstonLogger.info(`Project created successfully: ${project.id}`);

        return {
            message: 'Project created successfully',
            data: project,
        };
    }

    async getProjects(user: JwtPayload) {
        const projects = await this.projectRepository.find({
            where: {
                user_id: user.sub,
            },
            order: {
                created_at: 'DESC',
            },
        });

        return {
            message: 'Projects fetched successfully',
            data: projects,
        };
    }

    async getProjectById(projectId: string, user: JwtPayload) {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                user_id: user.sub,
            },
        });

        if (!project) {
            throw new NotFoundException(
                'Project not found',
            );
        }

        return {
            message: 'Project fetched successfully',
            data: project,
        };
    }

    async deleteProject(projectId: string, user: JwtPayload) {
        const project = await this.projectRepository.findOne({
            where: {
                id: projectId,
                user_id: user.sub,
            },
        });

        if (!project) {
            throw new NotFoundException(
                'Project not found',
            );
        }

        await this.projectRepository.remove(
            project,
        );

        return {
            message: 'Project deleted successfully',
        };
    }
}