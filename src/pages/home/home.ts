import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { Subscription } from 'rxjs/Subscription';
import {TodoItem, TodoList} from "../../model/model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	public pushPage = ListPage;
	public todolist: TodoList[];
	subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public todoservice: TodoServiceProvider) {
	
  }
	goToOtherPage(){
		this.navCtrl.push(this.pushPage);
  }
	ngOnInit(){
		this.todoservice.getList().subscribe(todolist => { this.todolist = todolist; });
 	 }

	
}
