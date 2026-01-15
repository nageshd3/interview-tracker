import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.hero');
    expect(heroSection).toBeTruthy();
  });

  it('should render features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featuresSection = compiled.querySelector('.features');
    expect(featuresSection).toBeTruthy();
  });

  it('should render benefits section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const benefitsSection = compiled.querySelector('.benefits');
    expect(benefitsSection).toBeTruthy();
  });

  it('should render CTA section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaSection = compiled.querySelector('.cta-section');
    expect(ctaSection).toBeTruthy();
  });

  it('should have dashboard navigation link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dashboardLinks = compiled.querySelectorAll('[routerLink="/dashboard"]');
    expect(dashboardLinks.length).toBeGreaterThan(0);
  });

  it('should display feature cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    expect(featureCards.length).toBeGreaterThanOrEqual(6); // We have 6 features
  });

  it('should display benefit items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const benefitItems = compiled.querySelectorAll('.benefit-item');
    expect(benefitItems.length).toBeGreaterThanOrEqual(6); // We have 6 benefits
  });
});
