import { TodoItem, TodoList } from '../../models/model';
import { Component } from '@angular/core';
import {NavParams, ViewController,ToastController} from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@Component({ templateUrl: 'list-modal.html' })
export class ModalCreate {
    todoitem: TodoItem;
    todolist: TodoList;
    uuid: string;
    new: boolean = true;

    constructor(private toastCtrl: ToastController, private navParams: NavParams, private viewCtrl: ViewController, private todoservice: TodoServiceProvider) {
        this.uuid = this.navParams.get('uuid');
        this.todolist = this.todoservice.getTodoList(this.uuid);
        if (this.navParams.get('todoitem')) {
            this.new = false;
            this.todoitem = this.navParams.get('todoitem');
        } else {
            this.todoitem = {
                uuid: this.todoservice.genUuid(),
                name: '',
                complete: false
            }
        }

    }



    public pushForm() {
        let message: string;
        if (this.todoitem.name == '') {
            let toastError = this.toastCtrl.create({
                message: 'Merci de renseigner le nom de la tâche',
                duration: 3000,
                position: 'top'
            });
            toastError.present();

        } else {
            if (this.new) {
                this.todoservice.addTodo(this.uuid, this.todoitem);
                message = 'enregistrée';
            } else {
                this.todoservice.editTodo(this.uuid, this.todoitem);
                message = 'modifiée';
            }
            let toast = this.toastCtrl.create({
                message: 'La tâche ' + this.todoitem.name + ' a bien été ' + message,
                duration: 3000
            });
            toast.present();
            this.dismiss();
        }

    }

 
   
    public dismiss() {
        this.viewCtrl.dismiss();
    }

}
