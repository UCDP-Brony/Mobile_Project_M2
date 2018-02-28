import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

	public todoitem: TodoItem[];
	subscription: Subscription;
  public uuid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public todoservice: TodoServiceProvider) {
    this.uuid = navParams.get('uuid');
    console.log(this.uuid);

  }
	ngOnInit(uuid){
		this.todoservice.getTodos('uuid').subscribe(todoitem => { this.todoitem = todoitem; });
 	 }

}
