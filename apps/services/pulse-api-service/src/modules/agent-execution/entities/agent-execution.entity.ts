import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Analysis } from "../../analysis/entities/analysis.entity";


@Entity("agent_executions")
export class AgentExecution {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    agentType: string;

    @Column()
    status: string;

    @Column({
        type: "float",
    })
    score: number;

    @Column({
        type: "text",
    })
    summary: string;

    @Column({
        type: "text",
    })
    logs: string;

    @Column({
        type: "json",
        nullable: true,
    })
    insights: string[];
    
    @Column({
        type: "json",
        nullable: true,
    })
    risks: string[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => Analysis,
        (analysis) =>
            analysis.agentExecutions,
        {
            onDelete: "CASCADE",
        },
    )
    analysis: Analysis;
}