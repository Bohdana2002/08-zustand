interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const NotesLayout = ({ sidebar, children }: Props) => {
  return (
    <section style={{ display: "flex", gap: "20px", marginTop: '20px' }}>
      <aside style={{ width: "200px" }}>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesLayout;
