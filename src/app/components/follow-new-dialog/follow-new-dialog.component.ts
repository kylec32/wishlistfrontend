import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Follower } from 'src/app/models/follower.interface';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { searchUsers } from 'src/app/actions/linker.actions';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow-new-dialog',
  templateUrl: './follow-new-dialog.component.html',
  styleUrls: ['./follow-new-dialog.component.css']
})
export class FollowNewDialogComponent implements OnInit {
  searchList: Follower[] = [];
  searchField: FormControl;
  followForm: FormGroup;
  loading: boolean = false;

  constructor(private dialogRef: MatDialogRef<FollowNewDialogComponent>,
    // private linkerService: LinkerService,
    private fb:FormBuilder,
    private store: Store<any>) {
      this.searchField = new FormControl();
      this.followForm = this.fb.group({search: this.searchField});
     }

  ngOnInit() {
    this.searchField
          .valueChanges
          .pipe(
            // tap( _ => 
            //   this.loading = true
            // ),
            switchMap(term => {
              this.store.dispatch(searchUsers({userIdentitiferPrefix: term}));
              return of()
            })
          )
          .subscribe();
    // this.searchField
    //           .valueChanges
    //           .pipe(
    //             tap( _ => 
    //               this.loading = true
    //             )
    //           )
    //           .debounceTime(400)
    //           .switchMap(term => {
    //             if(term.length > 0) {
    //               return this.linkerService.searchFollowers(term);
    //             } else {
    //               return Observable.of([]);
    //             }
    //           })
    //           .pipe(
    //             tap( _ => 
    //               this.loading = false
    //             )
    //           )
    //           .subscribe(result => this.searchList = result);
  }

  followWithEmail(user: Follower): void {
    this.searchList = [];
    this.searchField.setValue('');
    this.dialogRef.close({cancelled: false, follower: user});
  }

  noResults(): boolean {
    return this.searchList.length == 0 && !this.loading && this.searchField.value != undefined && this.searchField.value.length > 0;
  }

  done() {
    this.dialogRef.close({cancelled: true});
  }

}
