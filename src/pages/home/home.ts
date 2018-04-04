import { Component } from '@angular/core';
import { NavController,  NavParams, AlertController, ItemSliding, ModalController, ToastController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { Subscription } from 'rxjs/Subscription';
import {TodoItem, TodoList} from "../../models/model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public pushPage = ListPage;
	public todolist: TodoList[];
	subscription: Subscription;

  constructor(public navCtrl: NavController, public todoservice: TodoServiceProvider,public alertCtrl: AlertController, public modalCtrl: ModalController, private toastCtrl: ToastController) {
	this.loadTodoList();
  }

  public calculReste(todoList: TodoList) {
    let count = 0;
    for (let i = 0; i < todoList.items.length; i++) {
      if (todoList.items[i].complete === false) {
        count++;
      }
    }
    return count;
  }

	goToOtherPage(elem: TodoList){
		this.navCtrl.push(this.pushPage, {uuid: elem.uuid});
  	}
	private loadTodoList(){
		this.todoservice.getList().subscribe(todolist => { this.todolist = todolist; });
 	}

	public showConfirmDelete(slidingItem: ItemSliding, elem: TodoList) {

		let confirm = this.alertCtrl.create({
        		title: 'Alerte',
       			message: 'Voulez vous vraiment supprimer la liste ' + elem.name + ' ?',
        		buttons: [{
        	    		text: 'Non',
        	    		handler: () => {
        	      			slidingItem.close();
        	    		}
			},{
        	    		text: 'Oui',
        	    		handler: () => {
        	      			this.todoservice.deleteTodoList(elem.uuid);
       		       			let toast = this.toastCtrl.create({
      		          			message: 'La liste ' + elem.name + ' a bien été supprimée',
                				duration: 3000
              				});
              				toast.present();
              				this.loadTodoList();
            			}
          		}]
      		});
    		confirm.present();
 	}

	public showPromptCreate() {
	    let prompt = this.alertCtrl.create({
	      title: 'Listes',
	      message: "Ajouter une liste",
	      inputs: [{
		  name: 'name',
		  placeholder: 'Nom'
		},],
	      buttons:[{
		  text: 'Annuler',
		  handler: data => { }
		},{
		  text: 'Enregistrer',
		  handler: data => {
		    if (data.name == '') {
		      let toastError = this.toastCtrl.create({
		        message: 'Merci de renseigner un nom',
		        duration: 3000,
		        position: 'top'
		      });
		      toastError.present();
		      return false;
		    } else {
		      this.todoservice.addTodoList(data.name);
		      this.loadTodoList();
		    }
		  }
		}]
	    });
	    prompt.present();
	  }

	  public showPromptUpdate(ItemSliding: ItemSliding, elem: TodoList) {
	    let prompt = this.alertCtrl.create({
	      title: 'Listes',
	      message: "Modifier la liste " + elem.name,
	      inputs: [
		{
		  name: 'name',
		  placeholder: 'Nom',
		  value: elem.name
		},
	      ],
	      buttons: [
		{
		  text: 'Annuler',
		  handler: data => { ItemSliding.close(); }
		},
		{
		  text: 'Enregistrer',
		  handler: data => {
		    elem.name = data.name;
		    this.todoservice.editTodoList(elem);
		    this.loadTodoList();
		    ItemSliding.close();
		  }
		}
	      ]
	    });
	    prompt.present();
	  }
}
