import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

	public todolist: TodoList[];
	subscription: Subscription;

  constructor(public navCtrl: NavController, public todoservice: TodoServiceProvider) {

  }
	ngOnInit(){
		this.todoservice.getList().subscribe(todolist => { this.todolist = todolist; });
 	 }

}
