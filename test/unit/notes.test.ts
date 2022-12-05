import { assert, expect } from 'chai';
import dbInit from '../../db/init';

import * as noteService from '../../services/notes';
import * as userService from '../../services/users';

import runMigrations from '../../db/migrate';

describe('Notes test', () => {
  before(async () => {
    await runMigrations();
    await dbInit();
    await noteService.clearModel();
    await userService.clearModel();
  });
  const userData = {
    username: 'username',
    tgid: 417992823,
  };
  const noteText = 'first note here';
  let id = 0;
  let userId = 0;
  const tags = ['tag1', 'tag2', 'tag3'];
  it('should create one user and one note for this user', async () => {
    const user = await userService.createUser(userData.username, userData.tgid);
    const note = await noteService.create(user.username, noteText, tags);
    userId = user.id;
    id = note.id;
    expect(user).to.have.property('username').and.to.equal(userData.username);
    expect(note).to.have.property('text').and.to.be.a('string');
  })
  it('should get note by id', async () => {
    const note = await noteService.getById(id);
    assert.notEqual(note, null);
    expect(note).to.have.property('text').and.to.be.a('string');
    expect(note!.text).to.equal(noteText)
  });

  it('should delete created user instance', async () => {
    const user = await userService.getById(userId);
    expect(user).to.not.equal(null);
    await userService.deleteUser(user!.id);
    const newUser = await userService.getById(userId);
    expect(newUser).to.equal(null);
  });

  it('should delete created note instance', async () => {
    const note = await noteService.getById(id);
    expect(note).to.not.equal(null);
    await noteService.del(note!.id);
    const newNote = await noteService.getById(id);
    expect(newNote).to.equal(null);
  });

});