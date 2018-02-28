import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ListPage } from '../list/list';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { Subscription } from 'rxjs/Subscription';
import {TodoItem, TodoList} from "../../models/model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	public pushPage = ListPage;
	public todolist: TodoList[];
	subscription: Subscription;

  constructor(public navCtrl: NavController, public todoservice: TodoServiceProvider) {

  }
	goToOtherPage(uuidlist){
		this.navCtrl.push(this.pushPage, {uuid: uuidlist});
  }
	ngOnInit(){
		this.todoservice.getList().subscribe(todolist => { this.todolist = todolist; });
 	 }


}
