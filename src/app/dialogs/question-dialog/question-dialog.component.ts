import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { QuestionDialogData } from './QuestionDialogData';
import { QuestionsAnswersService } from 'src/app/routed_components/questions-answers/questions-answers.service';
import { Question } from 'src/models/entities/Question';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LBL_MESSAGE_BODY, LBL_SIGNATURE, LBL_REPLY, LBL_REPLY_TO_THIS_QUESTION } from 'src/app/shared/i18/es/labels';
import { Answer } from 'src/models/entities/Answer';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.sass']
})
export class QuestionDialogComponent
  implements OnInit {

  protected svc: QuestionsAnswersService;

  public question: Question;
  public replyForm: FormGroup;

  public get replyContent() { return this.replyForm.get('replyContent'); }
  public get signature() { return this.replyForm.get('signature'); }

  public get labelReplyToQuestion(): string { return LBL_REPLY_TO_THIS_QUESTION; }
  public get labelReplyContent(): string { return LBL_MESSAGE_BODY; }
  public get labelSignature(): string { return LBL_SIGNATURE; }
  public get labelReply(): string { return LBL_REPLY; }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: QuestionDialogData,
    protected dialog: MatDialogRef<QuestionDialogComponent>,
    protected fb: FormBuilder
  ) {
    this.svc = data.svc;
    this.question = data.question;

    this.replyForm = this.fb.group({
      replyContent: ['', Validators.required],
      signature: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onClickThumbsUpAnswer(a: Answer): void {
    a.votes++;
  }

  public submitReply(): void {
    const newReply: Answer = {
      id: undefined,
      date: new Date(),
      author: { name: this.signature.value },
      content: this.replyContent.value,
      votes: 0,
      accepted: true
    };

    console.log(newReply);
    alert('Por construir');
  }

}
