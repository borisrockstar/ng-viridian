import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MSG_INF_UNSUPPORTED_OPERATION } from 'src/text/es/messages';
import { ConfirmationDialogData, ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation.dialog.component';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { APP_NAME } from 'src/app/app.globals';
import { LBL_TOGGLE_SIDEMENU, LBL_EDIT_PROFILE, LBL_DISCONNECT } from 'src/text/es/labels';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
  implements OnInit {

  public get sidenavOpen(): boolean { return this.svc.sidenavOpen; }
  public set sidenavOpen(v: boolean) { this.svc.sidenavOpen = v; }

  public get applicationNameLabel(): string { return APP_NAME; }
  public get currentModuleNameLabel(): string { return this.svc.currentModuleName; }
  public get userNameLabel(): string { return 'User'; }
  public get toggleSideMenuLabel(): string { return LBL_TOGGLE_SIDEMENU; }
  public get editProfileLabel(): string { return LBL_EDIT_PROFILE; }
  public get disconnectLabel(): string { return LBL_DISCONNECT; }

  constructor(
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected svc: AppService
  ) { }

  ngOnInit() {
  }

  protected askToConfirmExitSession(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      title: '¿Cerrar sesión?',
      message: 'Cualquier cambio no guardado se perderá.'
    };

    return this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickEditProfile(): void {
    this.snackBar.open(MSG_INF_UNSUPPORTED_OPERATION);
  }

  public onClickExitSession(): void {
    this.snackBar.open(MSG_INF_UNSUPPORTED_OPERATION);
  }
}
