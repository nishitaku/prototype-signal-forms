import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  applyEach,
  applyWhen,
  Control,
  disabled,
  form,
  required,
  submit,
  validate,
  ValidationError,
} from '../signal-forms';
import {
  Friend,
  FriendComponent,
  friendSchema,
} from './components/friend/friend';
import { confirmationPasswordValidator } from './validators/confirm-password-validator';
import { emailValidator } from './validators/email-validator';

interface Feedback {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  recommendToFriends: boolean;
  friends: Friend[];
}

@Component({
  selector: 'app-root',
  imports: [
    Control,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FriendComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('prototype-signal-forms');

  readonly data = signal<Feedback>({
    name: '',
    email: '',
    password: '',
    confirmationPassword: '',
    recommendToFriends: false,
    friends: [],
  });

  readonly form = form(this.data, (path) => {
    required(path.name);
    required(path.email);
    validate(path.email, emailValidator);

    required(path.password);
    required(path.confirmationPassword);
    disabled(path.confirmationPassword, ({ valueOf }) => {
      return valueOf(path.password) === '';
    });
    validate(path.confirmationPassword, confirmationPasswordValidator(path));

    applyWhen(
      path,
      ({ value }) => value().recommendToFriends,
      (pathWhenTrue) => {
        applyEach(pathWhenTrue.friends, friendSchema);
      }
    );
    // 以下でも可
    // applyEach(path.friends, friendSchema);
    // hidden(path.friends, ({ valueOf }) => {
    //   return valueOf(path.recommendToFriends) === false;
    // });
  });

  addFriend() {
    this.form.friends().value.update((f) => [...f, { name: '', email: '' }]);
    // 以下でも可
    // this.data.update((d) => ({ ...d, friends: [...d.friends, { name: '', email: '' }] }));
  }

  submit() {
    submit(this.form, async () => {
      console.warn(`submit`);
      return Promise.resolve([
        {
          field: this.form.name,
          kind: 'notUnique',
        } as unknown as ValidationError,
      ]);
    });
  }
}
