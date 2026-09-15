import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateButton = page.getByRole('button', { name: 'Update Article' });
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      for (const tag of tags){
        await this.tagsField.fill(tag);
        await this.tagsField.press('Enter');
      }
    });
  }

  async clickUpdateButton() {
    await test.step(`Click the 'Update article' button`, async () => {
      await this.updateButton.click();
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async submitArticleForm(article) {
    await test.step(`Fill the 'Create article' form`, async () => {
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.text);
      if (article.tags) {
        await this.fillTagsField(article.tags);
      }
      await this.clickPublishArticleButton();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  tagChipRemoveIcon(tag) {
  return this.page
    .locator('.tag-pill')
    .filter({ hasText: tag })
    .locator('i.ion-close-round');
}

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.tagChipRemoveIcon(tag).click();
      await expect(this.tagChipRemoveIcon(tag)).toHaveCount(0);
  });
}
  
}
