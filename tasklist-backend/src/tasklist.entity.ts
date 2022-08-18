import { long } from "@elastic/elasticsearch/lib/api/types";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class taskEntity {
    @PrimaryGeneratedColumn('increment')
    public id ?: number;

    @Column()
    bpmnProcessId : string;

    @Column()
    elementId : string;

    @PrimaryColumn({ type : 'bigint'})
    elementInstanceKey : long;

    @Column({ type : 'bigint'})
    processInstanceKey : long;

    @Column({ type : 'bigint'})
    processDefinitionKey : long;

    @Column()
    timestamp : string;

    @Column()
    variables : string;

    @Column()
    assignee : string;

    @Column()
    isUpdated : number;

}