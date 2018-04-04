import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ItemSliding, ModalController, ToastController } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { Subscription } from 'rxjs/Subscription';
import { TodoItem } from './../../models/model';
import { ModalCreate } from './list-modal';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

	public todoitem: TodoItem[];
	subscription: Subscription;
	public uuid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public todoservice: TodoServiceProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, private toastCtrl: ToastController) {
	const  list = this.navParams.get('list');
    	this.list = list;
	this.uuid = list.uuid;
	this.loadTodo(list.uuid);
	
  }
	private loadTodo(uuid: string){
		this.todoservice.getTodos(uuid).subscribe(item => { this.todoitem = item; });
 	 }

	public completeTask(todo: TodoItem) {
    		todo.complete = (todo.complete === true) ? false : true;
  		this.todoservice.editTodo(this.uuid, todo);
   		this.loadTodo(this.uuid);
  	}



	public showConfirmDelete(slidingItem: ItemSliding, item: TodoItem, uuid: string) {

	    let confirm = this.alertCtrl.create({
	        title: 'Alerte',
	        message: 'Voulez-vous vraiment supprimer la tâche ' + item.name + ' ?',
	        buttons: [{
	            text: 'Non',
	            handler: () => {
	            slidingItem.close();
	            }
	        },{
	            text: 'Oui',
	            handler: () => {
	         	  this.todoservice.deleteTodo(uuid, item.uuid);
	          	  let toast = this.toastCtrl.create({
				message: 'La tâche ' + item.name + ' a bien été supprimée',
				duration: 3000
	            });
	            toast.present();
	            this.loadTodo(uuid);
	            }
	          }
	        ]
	      });
	    confirm.present();
	}
	
	 public showModalCreate(uuid: string) {
	    let modal = this.modalCtrl.create(ModalCreate, { uuid: uuid });
	    modal.onDidDismiss(() => {

	      this.loadTodo(uuid);
	    });
	    modal.present();

	  }

	  public showModalUpdate(slidingItem: ItemSliding, item: TodoItem, uuid: string) {
	    let modal = this.modalCtrl.create(ModalCreate, {uuid: uuid, todo: item});
	    modal.onDidDismiss(() => {this.loadTodo(uuid);
	      slidingItem.close();
	    });
	    modal.present();
	  }


}

