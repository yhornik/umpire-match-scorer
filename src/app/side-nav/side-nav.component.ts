import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {}

  ngOnInit(): void {
    // push GTM data layer for every visited page
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };
        console.log('url changed - gtmTag', gtmTag);
        this.gtmService.pushTag(gtmTag);
      } else if (item instanceof NavigationError) {
        // Present error to user
        console.log( 'error ', item.error);
      }

    });    
  }

  customEvent(eventId: string) {
    // push GTM data layer with a custom event
    const eventToPush = `clickButton`;
    const dataToPush = `my-custom-event-${eventId}`;
    const gtmTag = {
      event: eventToPush,
      data: dataToPush,
    };
    this.gtmService.pushTag(gtmTag);
    console.log('event - gtmTag', gtmTag);
  }
}
