import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomPageRoutingModule } from './classroom-routing.module';

import { ClassroomPage } from './classroom.page';
import {TwilioComponent} from '../../components/twilio/twilio.component';
import {TwilioService} from '../../components/twilio/services/twilio.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClassroomPageRoutingModule,
    ],
    providers: [TwilioService],
    declarations: [ClassroomPage, TwilioComponent]
})
export class ClassroomPageModule {}
