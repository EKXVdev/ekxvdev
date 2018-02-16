import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {Client} from "../../models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService) {}

  //everything inside ngOnInit() happens when the component loads
  ngOnInit() {
      //get client id from the url
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe(client => {
      //check if the client exists and if he owes money to provide visual feedback
        if(client != null){
            if(client.balance > 0){
              this.hasBalance = true;
            }
        }
      this.client = client;
    });
  }

  updateBalance(){
      if(confirm('Are you sure you want to update this balance?')){
        this.clientService.updateClient(this.client);
        this.flashMessage.show('Balance updated', {
          cssClass: 'alert-success', timeout: 10000
        });
      }
  }

  onDeleteClick(){
    if(confirm('Are you sure you want to delete this user?')){
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client removed', {
        cssClass: 'alert-success', timeout: 10000
      });
      this.router.navigate(['/']);
    }
  }
}
