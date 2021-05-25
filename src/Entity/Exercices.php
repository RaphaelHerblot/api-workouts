<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ExercicesRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ORM\Entity(repositoryClass=ExercicesRepository::class)
 * @ApiResource(
 *  subresourceOperations={ 
 *      "workouts_get_subresource"={"path"="/exercices/{id}/list_workouts"} 
 *  }, 
 *  normalizationContext={
 *      "groups"={"exercices_read"}
 *  }
 * )
 * @ApiFilter(SearchFilter::class, properties={"type"})
 * @ApiFilter(OrderFilter::class)
 */
class Exercices
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"exercices_read", "workouts_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"exercices_read", "workouts_read", "workouts_get_subresource", "users_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"exercices_read", "workouts_read"})
     */
    private $instructions;

    /**
     * @ORM\ManyToMany(targetEntity=Muscles::class, inversedBy="exercices")
     * @Groups({"exercices_read", "workouts_read"})
     */
    private $muscles;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"exercices_read", "workouts_read", "users_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"exercices_read"})
     */
    private $thumbnail = "";

    /**
     * @ORM\ManyToMany(targetEntity=Workouts::class, mappedBy="exercices")
     * @Groups({"exercices_read"})
     * @ApiSubresource
     */
    private $listWorkouts;

    public function __construct()
    {
        $this->muscles = new ArrayCollection();
        $this->listWorkouts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getInstructions(): ?string
    {
        return $this->instructions;
    }

    public function setInstructions(string $instructions): self
    {
        $this->instructions = $instructions;

        return $this;
    }

    /**
     * @return Collection|Muscles[]
     */
    public function getMuscles(): Collection
    {
        return $this->muscles;
    }

    public function addMuscle(Muscles $muscle): self
    {
        if (!$this->muscles->contains($muscle)) {
            $this->muscles[] = $muscle;
        }

        return $this;
    }

    public function removeMuscle(Muscles $muscle): self
    {
        $this->muscles->removeElement($muscle);

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    /**
     * @return Collection|Workouts[]
     */
    public function getListWorkouts(): Collection
    {
        return $this->listWorkouts;
    }

    public function addListWorkout(Workouts $listWorkout): self
    {
        if (!$this->listWorkouts->contains($listWorkout)) {
            $this->listWorkouts[] = $listWorkout;
            $listWorkout->addExercice($this);
        }

        return $this;
    }

    public function removeListWorkout(Workouts $listWorkout): self
    {
        if ($this->listWorkouts->removeElement($listWorkout)) {
            $listWorkout->removeExercice($this);
        }

        return $this;
    }
}
