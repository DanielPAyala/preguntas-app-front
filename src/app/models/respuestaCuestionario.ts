import { RespuestaCuestionarioDetalle } from './respuestaCuestionarioDetalle';
export interface RespuestaCuestionario {
    id?: number;
    cuestionarioId: number;
    nombreParticipante: string;
    fecha?: Date;
    ListRtaCuestionarioDetalle: RespuestaCuestionarioDetalle[];
}