export function sanitize(msg: any) {
  delete msg.global_position;
  delete msg.globalPosition;
  delete msg.position;
  delete msg.time;
  delete msg.metadata.time;
}
