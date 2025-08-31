import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Control, Field, required, schema, validate } from '../../../signal-forms';
import { emailValidator } from '../../validators/email-validator';

export interface Friend {
  name: string;
  email: string;
}

export const friendSchema = schema<Friend>((friend) => {
  required(friend.name);
  required(friend.email);
  validate(friend.email, emailValidator);
});

@Component({
  selector: 'app-friend',
  imports: [MatFormFieldModule, MatInputModule, Control],
  templateUrl: './friend.html',
  styleUrl: './friend.scss',
})
export class FriendComponent {
  friend = input.required<Field<Friend>>();
}
