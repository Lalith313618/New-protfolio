import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProjectsComponent } from './projects';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the detailed view modal', () => {
    const testProject = component.projects[0];
    expect(component.selectedProject).toBeNull();

    component.openProjectModal(testProject);
    expect(component.selectedProject).toBe(testProject);
    expect(document.body.style.overflow).toBe('hidden');

    component.closeProjectModal();
    expect(component.selectedProject).toBeNull();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should return a valid project link', () => {
    const testProject = component.projects[0];
    const link = component.getProjectLink(testProject);
    expect(link).toBeTruthy();
    expect(link.startsWith('http')).toBe(true);
  });
});

