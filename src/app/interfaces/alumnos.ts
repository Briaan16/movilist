export interface Alumnos {
    id?: string;
    nombre: string;
    presente: number;
    ausente: number;
    totalClases?: number;  // Este es el nuevo campo
  }
  