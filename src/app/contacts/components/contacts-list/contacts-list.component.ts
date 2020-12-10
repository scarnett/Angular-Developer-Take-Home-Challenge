import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from '@grm/app.state'
import { FetchStatus } from '@grmCommon/enums/status.enums'
import { ContactsState, errorMessageSelector, fetchStatusSelector } from '@grmContacts/contacts.state'
import { fetchContacts } from '@grmContacts/contacts.actions'
import { Contact } from '@grmContacts/contacts.model'
import { contactsSelector, sortColumnSelector, sortDirectionSelector } from '@grmContacts/contacts.state'

/**
 * GRM Contacts component
 *
 * @example <grm-contacts-list></grm-contacts-list>
 */
@Component({
  selector: 'grm-contacts-list',
  template: '<grm-contacts-list-display fxFlex [contacts]="contacts$ | async" [sortColumn]="sortColumn$ | async" ' +
    '[sortDirection]="sortDirection$ | async" [fetchStatus]="fetchStatus$ | async" ' +
    '[errorMessage]="errorMessage$ | async"></grm-contacts-list-display>'
})
export class ContactsListComponent implements OnInit {
  contacts$: Observable<Contact[]> = this.store.select(contactsSelector)
  sortColumn$: Observable<string> = this.store.select(sortColumnSelector)
  sortDirection$: Observable<string> = this.store.select(sortDirectionSelector)
  fetchStatus$: Observable<string> = this.store.select(fetchStatusSelector)
  errorMessage$: Observable<string> = this.store.select(errorMessageSelector)

  constructor(
    private store: Store<ContactsState>
  ) { }

  ngOnInit(): void { }
}

/**
 * GRM Contacts display component
 *
 * @example <grm-contacts-list-display [contacts]="contacts$ | async"></grm-contacts-list-display>
 */
@Component({
  selector: 'grm-contacts-list-display',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListDisplayComponent implements OnInit, OnChanges {
  @Input() contacts: Contact[] | null
  @Input() sortColumn: string | null
  @Input() sortDirection: string | null
  @Input() fetchStatus: string | null = FetchStatus.fetching
  @Input() errorMessage: string | null

  @ViewChild('contactsFetching') public contactsFetchingTemplateRef: TemplateRef<any>
  @ViewChild('contactsSuccess') public contactsSuccessTemplateRef: TemplateRef<any>
  @ViewChild('contactsFailed') public contactsFailedTemplateRef: TemplateRef<any>

  public contentTemplate: TemplateRef<any>

  constructor(
    private appStore: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.contentTemplate = this.contactsFetchingTemplateRef
  }

  /**
   * Determines which content template to render based off of the fetch status
   * This is used to get around the dreaded ExpressionChangedAfterItHasBeenCheckedError
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('fetchStatus' in changes) {
      switch (changes.fetchStatus.currentValue) {
        case FetchStatus.fetchSuccess:
          this.contentTemplate = this.contactsSuccessTemplateRef
          break

        case FetchStatus.fetchFailed:
          this.contentTemplate = this.contactsFailedTemplateRef
          break

        case FetchStatus.fetching:
        default:
          this.contentTemplate = this.contactsFetchingTemplateRef
          break
      }
    }
  }

  /**
   * Handles the retry tap
   *
   * @param $event
   */
  tapRetry($event: any): void {
    $event.preventDefault()
    this.appStore.dispatch(fetchContacts())
  }
}
