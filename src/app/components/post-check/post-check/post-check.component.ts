import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  CHILDVIDEO,
  FILEVIDEO,
} from '../../../shared/modals/file-videos.modal';
import PerfectScrollbar from 'perfect-scrollbar';
import { StageAPIService } from 'src/app/shared/services/stage.service';
import { PostcheckService } from 'src/app/shared/services/postcheck.service';
import { SignoutService } from 'src/app/shared/services/signout.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { BUTTON, Postcheck_Buttons } from 'src/app/shared/data/buttons';
import { InputTollbooth } from 'src/app/shared/modals/inputTollbooth.modal';
import { Router } from '@angular/router';
import { RouterLink } from 'src/app/shared/shared/rout.service';

@Component({
  selector: 'app-post-check',
  templateUrl: './post-check.component.html',
  styleUrls: ['./post-check.component.scss'],
})
export class PostCheckComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) vPlayer!: ElementRef;
  listHeadButtons: BUTTON[] = Postcheck_Buttons;

  hasSubtitle: boolean = true;
  loader: boolean = false;
  speed!: number;
  indexVideo: number = 0;
  indexFolder: number = 0;
  subtitle: string = '';
  video: string = '';
  autoPlay: boolean = false;
  listSpeed = [
    { title: 'x1', value: 1 },
    { title: 'x2', value: 2 },
    { title: 'x4', value: 4 },
    { title: 'x6', value: 6 },
    { title: 'x8', value: 8 },
  ];
  listStage: any;
  videos: any[] = [];
  inputData!: any;
  hasValue: boolean = false;
  fileVideos: FILEVIDEO[] = [];
  constructor(
    private stageservice: StageAPIService,
    private signOut: SignoutService,
    private postcheckservice: PostcheckService,
    private errorservice: ErrorService,
    private router: Router,
    private urlLink: RouterLink
  ) {
    this.listHeadButtons = Postcheck_Buttons;
  }
  routCurrent = this.router.url;
  ngOnInit(): void {
    window.history.replaceState(null, '', this.router.url);
    console.log('History:' + window.history);
    this.hasValue = false;
    this.saveButtons();
    if (localStorage.getItem('is_login') === 'invalid') {
      this.signOut.signout();
    }
    if (localStorage.getItem('is_login') === 'valid') {
      this.listHeadButtons = this.stageservice.changeValueButton(
        this.listHeadButtons
      );
    }
  }
  async saveButtons() {
    const listStage = await this.getStationOptions();
    localStorage.setItem('stageBtns', JSON.stringify(listStage));
    const btn = this.listHeadButtons.findIndex((a) => a.name == 'tollbooth');
    this.listHeadButtons[btn].children = listStage;
  }
  async getStationOptions() {
    let stageOption: any[] = [];
    let gatewayId: string[] = [];
    let button: any;
    const listStage = await this.stageservice.GetAllStage();
    for (let i = 0; i < listStage.length; i++) {
      button = {
        title: listStage[i].stage.stageName,
        value: listStage[i].stage.gateWayID,
        children: listStage[i].lanes,
      };
      stageOption.push(button);
      gatewayId.push(listStage[i].stage.gateWayID);
    }
    button = {
      title: 'Tất Cả Trạm',
      value: gatewayId,
      children: null,
    };
    stageOption.push(button);
    return stageOption;
  }
  changeSpeed(speed: number) {
    this.speed = speed;
    this.vPlayer.nativeElement.playbackRate = speed;
  }
  ngAfterViewInit() {
    const minimal: any = document.querySelector('#minimal');
    let p = new PerfectScrollbar(minimal, {
      wheelPropagation: false,
    });
  }
  getSource(video: CHILDVIDEO, indexFolder: number, indexFile: number) {
    this.indexVideo = indexFile;
    this.indexFolder = indexFolder;
    this.video = video.url;
    this.subtitle = this.urlLink.urlVtt + video.fileName;
    this.hasSubtitle = video.hasData;
    this.changeSpeed(this.speed);
    this.vPlayer.nativeElement.load();
    this.vPlayer.nativeElement.play();
  }
  endVid() {
    if (this.autoPlay) {
      const indexStart =
        this.indexFolder.toString() + this.indexVideo.toString();
      this.setActiveVideo(indexStart);
    }
  }
  autoPlayList() {
    this.autoPlay = !this.autoPlay;
    if (this.autoPlay) {
      const indexStart =
        this.indexFolder.toString() + this.indexVideo.toString();
      if (this.fileVideos.length > 0 && this.fileVideos[0].group != null) {
        this.setActiveVideo(indexStart);
      }
    }
  }
  checkFileExit() {
    this.indexVideo++;
    if (this.fileVideos[this.indexFolder].group!.length <= this.indexVideo) {
      this.indexFolder++;
      this.indexVideo = 0;
      if (this.fileVideos.length > this.indexFolder) {
      } else {
        this.indexFolder = 0;
      }
    }
    return this.fileVideos[this.indexFolder].group[this.indexVideo];
  }
  setActiveVideo(classIndex: string) {
    const element: any = document.getElementsByClassName(classIndex);
    element[0].click();
  }
  async getSearchData(inputValue: InputTollbooth) {
    this.loader = true;
    this.hasValue = false;
    this.hasSubtitle = true;
    this.inputData = inputValue;
    await this.getFileVideos();
  }
  async getFileVideos() {
    let station: string =
      this.inputData.tollbooth === undefined ? '' : 'channel1';
    //this.inputData.tollbooth.value;
    let date: string =
      this.inputData.date === undefined ? '' : this.inputData.date;
    let lane: string =
      this.inputData.lane === undefined ? '' : this.inputData.lane.value;
    const videos = await this.postcheckservice.getFileVideo(
      station,
      lane,
      date
    );
    this.loader = false;
    if (videos['error'] === undefined) {
      this.fileVideos = videos.result;
      this.hasValue = true;
      this.getSource(this.fileVideos[0].group[0], 0, 0);
    } else {
      if (this.router.url === this.routCurrent) {
        this.errorservice.getError(videos);
      }
    }
  }
  getDataFromLocalStorage(name: string) {
    const temp = localStorage.getItem(name);
    if (temp != null) {
      const buttons = JSON.parse(temp);
      return buttons;
    } else {
      return null;
    }
  }
}
