interface RevisionStatusI {
    PENDING: string
    APPROBED: string
    OBSERVED: string
  }
  
  const RevisionStatus: Readonly<RevisionStatusI> = {
    PENDING: 'PENDIENTE',
    APPROBED: 'APROBADO',
    OBSERVED: 'OBSERVADO'
  }
  
  export default RevisionStatus