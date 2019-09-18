import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(users: User[], name?: string, email?: string): any {
    users = users.filter((user: User) => {
      return user.name.toLocaleLowerCase().includes(name?name.toLocaleLowerCase():'')
    })
    users = users.filter((user: User) => {
      return user.email.toLocaleLowerCase().includes(email?email.toLocaleLowerCase():'')
    })
    return users
  }

}
