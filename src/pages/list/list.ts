import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { TodoItem } from './../../models/model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

	public todoitem: TodoItem[];
	subscription: Subscription;
  public uuid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public todoservice: TodoServiceProvider) {
    this.uuid = this.navParams.get('uuid');
    console.log(this.uuid);
	this.loadTodo(this.navParams.get('uuid'));
  }
	private loadTodo(uuid: string){
		this.todoservice.getTodos(uuid).subscribe(item => { this.todoitem = item; });
 	 }

}
