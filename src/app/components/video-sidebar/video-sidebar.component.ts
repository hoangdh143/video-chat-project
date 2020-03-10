import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-sidebar',
  templateUrl: './video-sidebar.component.html',
  styleUrls: ['./video-sidebar.component.scss'],
})
export class VideoSidebarComponent implements OnInit {
  participants = [];

  constructor() { }

  ngOnInit() {}

}
