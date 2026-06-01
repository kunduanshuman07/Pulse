import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Project } from "../../projects/entities/project.entity";
import { AgentExecution } from "../../agent-execution/entities/agent-execution.entity";
import { AnalysisTranslations } from "../types/analysis-translations.type";

@Entity("analyses")
export class Analysis {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    status: string;

    @Column({
        type: "float",
        nullable: true,
    })
    intelligenceScore: number;

    @Column({
        type: "text",
        nullable: true,
    })
    summary: string;

    @Column({
        type: "varchar",
        length: 5,
        default: "en",
    })
    outputLanguage: string;

    @Column({
        type: "json",
        nullable: true,
    })
    translations: AnalysisTranslations | null;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => Project,
        (project) =>
            project.analyses,
        {
            onDelete: "CASCADE",
        },
    )
    project: Project;

    @OneToMany(
        () => AgentExecution,
        (execution) =>
            execution.analysis,
    )
    agentExecutions: AgentExecution[];
}