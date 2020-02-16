import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NO_REACTIVE_FORM_EVENTS } from 'src/app/app.module.constants';
import { PersonProfile } from 'src/models/entities/PersonProfile';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: [
    '../../../../assets/styles/forms.sass',
    './person-form.component.sass'
  ]
})
export class PersonFormComponent {

  protected personId: number;
  public personFormGroup: FormGroup;

  public get name() { return this.personFormGroup.get('name'); }
  public get idNumber() { return this.personFormGroup.get('idNumber'); }
  public get address() { return this.personFormGroup.get('address'); }
  public get email() { return this.personFormGroup.get('email'); }
  public get phones() { return this.personFormGroup.get('phones') as FormArray; }

  constructor(
    protected fb: FormBuilder
  ) {
    this.personFormGroup = this.fb.group({
      name: ['', Validators.required],
      idNumber: ['', Validators.required],
      address: [''],
      email: [''],
      phones: this.fb.array([])
    });
  }

  public get person(): PersonProfile {
    if (this.personFormGroup.invalid) {
      return undefined;
    } else {
      return {
        id: null,
        fullName: this.name.value,
        idNumber: this.idNumber.value,
        address: this.address.value,
        email: this.email.value,
        phones: this.phones.value,
        country: undefined
      };
    }
  }

  @Input() public set person(input: PersonProfile) {
    if (!!!input) {
      console.log('falsy \'input\' param at \'PersonFormComponent@set person function\'');
    } else {
      if (input.id && typeof input.id === 'number') {
        this.personId = input.id as number;
      }

      this.name.setValue(input.fullName, NO_REACTIVE_FORM_EVENTS);
      this.idNumber.setValue(input.idNumber, NO_REACTIVE_FORM_EVENTS);

      if (input.address) {
        this.address.setValue(input.address, NO_REACTIVE_FORM_EVENTS);
      }
      if (input.email) {
        this.email.setValue(input.email, NO_REACTIVE_FORM_EVENTS);
      }
      if (input.phones) {
        this.phones.setValue(input.phones, NO_REACTIVE_FORM_EVENTS);
      }
    }
  }

  public addPhone(): void {
    const newPhone = this.fb.control('');
    this.phones.push(newPhone);
  }


}
