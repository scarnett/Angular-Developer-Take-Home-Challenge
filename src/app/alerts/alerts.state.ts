import { Alert } from './alerts.model'

export class AlertsState {
  alerts: Alert[] = []
  activeAlerts: string[]
  selectedAlerts: string[]
  sortColumn?: string
  sortDirection: string
  fetchStatus?: string
  error?: any
  errorMessage?: string

  constructor(
    alerts: Alert[],
    activeAlerts: string[],
    selectedAlerts: string[],
    sortColumn: string,
    sortDirection: string,
    fetchStatus: string,
    error: any,
    errorMessage: string
  ) {
    this.alerts = alerts
    this.activeAlerts = activeAlerts
    this.selectedAlerts = selectedAlerts
    this.sortColumn = sortColumn
    this.sortDirection = sortDirection
    this.fetchStatus = fetchStatus
    this.error = error
    this.errorMessage = errorMessage
  }
}

export const defaultAlertsState: AlertsState = {
  alerts: [],
  activeAlerts: [],
  selectedAlerts: [],
  sortDirection: 'desc'
}

// Selectors
export const alertsSelector = (state: any) => state.alerts.alerts
export const activeAlertsSelector = (state: any) => state.alerts.activeAlerts
export const isActiveAlertSelector = (state: any, props: any) => state.alerts.activeAlerts
  .find((errorId: string) => errorId === props.errorId)

export const selectedAlertsSelector = (state: any) => state.alerts.selectedAlerts
export const isSelectedAlertSelector = (state: any, props: any) => state.alerts.selectedAlerts
  .find((errorId: string) => errorId === props.errorId)

export const sortColumnSelector = (state: any) => state.alerts.sortColumn
export const sortDirectionSelector = (state: any) => state.alerts.sortDirection
export const fetchStatusSelector = (state: any) => state.alerts.fetchStatus
export const errorMessageSelector = (state: any) => state.alerts.errorMessage
