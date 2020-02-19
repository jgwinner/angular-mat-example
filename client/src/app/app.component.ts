import { Component } from '@angular/core';

import Quill from 'quill';

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = 'DIV';
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CreativeApp';
}
