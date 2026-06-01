import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { ProjectStatus } from '../enums/project-status.enum';
import { ContentLanguage } from '../enums/content-language.enum';
import { User } from 'src/modules/auth/entities/auth.entity';
import { Analysis } from '../../analysis/entities/analysis.entity';

@Entity('projects')
export class Project extends BaseEntity {
    @Column()
    name: string;

    @Column()
    category: string;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 5,
        default: ContentLanguage.EN,
    })
    contentLanguage: ContentLanguage;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.DRAFT,
    })
    status: ProjectStatus;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'user_id',
    })
    user: User;

    @OneToMany(
        () => Analysis,
        (analysis) =>
            analysis.project,
    )
    analyses: Analysis[];
}