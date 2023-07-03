interface RevisionStatusI {
    PENDING: string
    APPROBED: string
    OBSERVED: string
    NOT_ASSIGNED: string
  }
  
  const RevisionStatus: Readonly<RevisionStatusI> = {
    PENDING: 'PENDIENTE',
    APPROBED: 'APROBADO',
    OBSERVED: 'OBSERVADO',
    NOT_ASSIGNED: 'NO ASIGNADO'
  }
  
  export default RevisionStatus
