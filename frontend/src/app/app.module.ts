import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngrxEntityRelationshipReducer } from 'ngrx-entity-relationship';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { FeedModule } from './feed/feed.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HammerModule,
    StoreModule.forRoot({}, { metaReducers: [ngrxEntityRelationshipReducer] }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-center' }),
    SimpleModalModule,
    AuthModule,
    ProfileModule,
    PostModule,
    SettingsModule,
    FeedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
