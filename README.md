![Propsical_logo](src/assets/Propsical_logo.png)

## Introduction:

    - Propsical is real estate marketplace website that also provides appointment management system.
    - This is to solve the hassle of managing appointments while buyer looking and viewing multiple properties, and seller to schedule buyers to view at their schedule.

## Getting started:

### Upon first visiting page

![first_page](src/assets/first_page.png)

- it shows the login page with 2 icons at the navigation bar:
  ![before_login](src/assets/before_login.png)

  - Home icon: this is explore all public listings created by the app as a guest user (without login)
  - Login icon: this is to login as an registered user

- After login, you will see both icons changed:
  ![before_login](src/assets/after_login.png)
  <img src="./src/assets/after_login.png" alt="before_login" width="200"/>
  - Listings icon: this is where registered user able to see own created listings
  - Logout icon: this is to logout as an registered user

### As guest user:

- When one is exploring the public listing page, can inspect one of the listings:

  - One is able to click on the listing and be directed to another dedicated page with all the details just for the listing.
  - One is able to click on the `Appointment` and be directed to the appointment booking page.

    - Then one can select the date and timing, and followed by inputting name and phone number before proceeding to click `Book Appointment`

- Registering as a new registered user:

  - One simply just fill up username, password, name and phone number before clicking `Submit`

### As a registered user:

![registered_user_main_page](src/assets/registered_user_main_page.png)

- Type username and password before clicking `Login`
- Upon logging in, it will show all listings that previous created by the user.
- The user can click on `New Listing` to create.

#### Creating new listings:

- Fill in all the information as shown and once clicked 'Submit', it will direct the user to the picture uploading page.
- Click on the `choose file` to select the file to be uploaded before clicking `Upload`
- The new image once uploaded will be shown below the `Upload`
- The user can delete any uploaded images by clicking on the trash icon

#### Manipulating existing created listings:

- The user can click on the listings icon at the navigation bar.
- There are 4 buttons:
  - `View` to be directed to the dedicated page with all the details just for the listing
  - `Update` to be directed to the editing page
  - `Appointment` to be directed to the appointment booking and blocking page
  - `Delete` to delete the listing directly

#### Manipulating appointments booking & blocking:

- There are 2 calendar modes which is `Month` and `Day`:
  - `Day`: user can choose the date & timeslot to block or book appointment by filling in some description
    - And registered user can also unblock by deleting the blocked timeslots.
  - `Month`: user can select the range of dates to be blocked so that guest user cannot book appointments on those dates
    - And registered user can also unblock by deleting the blocked dates.
