interface RolesI {
  GENERAL_MANAGER: string
  FINANCIAL_MANAGER: string
  FINANCIAL_TECHNICIAN: string
  SYSTEM_ADMINISTRATOR: string
  SALES_MANAGER_CB: string
  SALES_MANAGER_LP: string
  SALES_MANAGER_SC: string
  SALES_MANAGER_OR: string
  SALES_MANAGER_TR: string
}

export const Roles: Readonly<RolesI> = {
  GENERAL_MANAGER: 'Gerente general',
  FINANCIAL_MANAGER: 'Jefe de finanzas',
  FINANCIAL_TECHNICIAN: 'Técnico de finanzas',
  SYSTEM_ADMINISTRATOR: 'Técnico en sistemas',
  SALES_MANAGER_CB: 'Administrador de operaciones de ventas Cochabamba',
  SALES_MANAGER_LP: 'Administrador de operaciones de ventas La Paz',
  SALES_MANAGER_SC: 'Administrador de operaciones de ventas Santa Cruz',
  SALES_MANAGER_OR: 'Administrador de operaciones de ventas Oruro',
  SALES_MANAGER_TR: 'Administrador de operaciones de ventas Trópico'
}
