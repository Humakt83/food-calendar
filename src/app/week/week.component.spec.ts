import { TestBed, async } from '@angular/core/testing';

import { WeekComponent } from './week.component';
import { DateService } from './date.service';
import { CalendarModule } from 'angular-calendar';

describe('WeekComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WeekComponent
            ],
            providers: [ DateService ],
            imports: [ CalendarModule.forRoot() ]
        }).compileComponents();
    }));

    it('creates the componenet', async(() => {
        const fixture = TestBed.createComponent(WeekComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('has date', async(() => {
        const fixture = TestBed.createComponent(WeekComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component.viewDate).toBeDefined();
    }));

    it('renders buttons for changing date', async(() => {
        const fixture = TestBed.createComponent(WeekComponent);
        const component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#today').value).toContain('TODAY');
        expect(compiled.querySelector('#previousWeek').value).toContain('↤');
        expect(compiled.querySelector('#nextWeek').value).toContain('↦');
    }));
});
