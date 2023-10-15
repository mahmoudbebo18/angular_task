import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  formData: any[];
  title: string;
  selectedLanguage: string = 'en';
  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,

  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({});

    this.formDataService.getFormData().subscribe(data => {
      this.formData = data.formInputs;
      console.log(this.formData);
      console.log(this.formData[0].options.translations.fra);
      
      
      this.title = data.name;
      this.formData.forEach((field, i) => {
        let validatorsArray: any[] = [];
        if (field.validators && field.validators.includes('required')) {
          validatorsArray.push(Validators.required);
        }
        if (field.validators && field.validators.includes('email')) {
          validatorsArray.push(Validators.email);
        }

        this.form.addControl(field.name, this.fb.control('', validatorsArray));
      });

    });
  }
  onSubmit() {
    if (this.form.valid) {
      alert('Form submitted!');
    } else {
      this.markFormControlsAsTouched(this.form);
    }
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.target.value;
    console.log(this.selectedLanguage);
    
  }
  private markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
