interface StatusI {
  EMITTED: string
  RECEIVED: string
  CANCELED: string
}

const Status: Readonly<StatusI> = {
  EMITTED: 'EMITIDO',
  RECEIVED: 'ENTREGADO',
  CANCELED: 'CANCELADO'
}

export default Status